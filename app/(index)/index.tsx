"use client";
import { useState } from "react";
import games, { GameKey } from "./games";

const HamsterKeyGenerator: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameKey | null>(null);
  const [keyCount, setKeyCount] = useState(1);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);
  const [showCopyStatus, setShowCopyStatus] = useState(false);

  const handleGameSelect = (gameId: string) => {
    const parsedGameId = parseInt(gameId, 10);

    // Ensure parsedGameId is a valid GameKey
    if (parsedGameId >= 1 && parsedGameId <= 10) {
      setSelectedGame(parsedGameId as GameKey);
    } else {
      alert("Invalid game selected.");
    }
  };

  const handleKeyCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyCount(Number(e.target.value));
  };

  const generateKeys = async () => {
    if (!selectedGame) {
      alert("Please select a game first.");
      return;
    }

    const game = games[selectedGame]; // No more error here because selectedGame is GameKey
    setProgress(0);
    setProgressText("Starting...");

    let totalProgress = 0;
    const updateProgress = (amount: number, text: string) => {
      totalProgress += amount;
      setProgress(totalProgress);
      setProgressText(text);
    };

    const generateKey = async () => {
      try {
        const clientId = generateClientId();
        const clientToken = await loginClient(clientId, game.appToken);

        for (let attempt = 0; attempt < game.attempts; attempt++) {
          const hasCode = await registerEvent(clientToken, game.promoId);
          updateProgress(100 / game.attempts / keyCount, "Generating keys...");
          if (hasCode) break;
          await delay(game.timing);
        }

        const promoCode = await createCode(clientToken, game.promoId);
        updateProgress(100 / keyCount, "Generating key...");
        return promoCode;
      } catch (error: any) {
        alert(`Failed to generate key: ${error.message}`);
        return null;
      }
    };

    const keys = await Promise.all(
      Array.from({ length: keyCount }, generateKey)
    );
    setGeneratedKeys(keys.filter(Boolean) as string[]);
    setProgressText("Completed");
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setShowCopyStatus(true);
          setTimeout(() => setShowCopyStatus(false), 2000);
        })
        .catch((err) => console.error("Failed to copy text:", err));
    }
  };

  const generateClientId = () => {
    const timestamp = Date.now();
    const randomDigits = Array.from({ length: 19 }, () =>
      Math.floor(10 * Math.random())
    ).join("");
    return `${timestamp}-${randomDigits}`;
  };

  const loginClient = async (clientId: string, appToken: string) => {
    const response = await fetch(
      "https://api.gamepromo.io/promo/login-client",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appToken, clientId, clientOrigin: "deviceid" }),
      }
    );

    if (!response.ok) throw new Error("Failed to login");
    const data = await response.json();
    return data.clientToken;
  };

  const registerEvent = async (clientToken: string, promoId: string) => {
    const response = await fetch(
      "https://api.gamepromo.io/promo/register-event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promoId,
          eventId: generateEventId(),
          eventOrigin: "undefined",
        }),
      }
    );

    if (!response.ok) return false;
    const data = await response.json();
    return data.hasCode;
  };

  const createCode = async (clientToken: string, promoId: string) => {
    const response = await fetch("https://api.gamepromo.io/promo/create-code", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promoId }),
    });

    if (!response.ok) throw new Error("Failed to generate key");
    const data = await response.json();
    return data.promoCode;
  };

  const generateEventId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="max-w-4xl mx-auto p-2 text-black bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-2 mb-8">
        {Object.entries(games).map(([id, game]) => (
          <button
            key={id}
            className={`p-4 border rounded-md text-center transition ${
              selectedGame === parseInt(id)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
            onClick={() => handleGameSelect(id)}
          >
            {game.name}
          </button>
        ))}
      </div>

      {selectedGame && (
        <>
          <div className="mb-4">
            <label
              htmlFor="keyCount"
              className="block text-gray-700 font-semibold mb-2"
            >
              Number of Keys:
            </label>
            <input
              type="number"
              id="keyCount"
              value={keyCount}
              onChange={handleKeyCountChange}
              className="w-full p-2 border rounded-md"
              min="1"
            />
          </div>

          <button
            className="w-full p-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition mb-4"
            onClick={generateKeys}
          >
            Start Generating Keys
          </button>

          <div id="progressContainer" className="mb-4">
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">{progressText}</p>
          </div>

          <div id="keysContainer" className="space-y-4">
            {generatedKeys.map((key, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-md"
              >
                <p className="text-gray-800">{key}</p>
                <button
                  onClick={() => copyToClipboard(key)}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>

          {showCopyStatus && (
            <p className="mt-4 text-green-500 text-center">
              Key copied to clipboard!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default HamsterKeyGenerator;
