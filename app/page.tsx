import HamsterKeyGenerator from "./(index)";

export default function Home() {
  return (
    <div>
      <h1 className="py-2 text-center">Hamster Key Generator</h1>
      <HamsterKeyGenerator />
      {/* <Tabs defaultValue="account" className="w-[80%] mx-auto">
        <TabsList className="flex gap-3">
          <TabsTrigger value="account">Key</TabsTrigger>
          <TabsTrigger value="password">All Key at a time</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <HamsterKeyGenerator />
        </TabsContent>
        <TabsContent value="password"><AllGenerate /></TabsContent>
      </Tabs> */}
    </div>
  );
}
