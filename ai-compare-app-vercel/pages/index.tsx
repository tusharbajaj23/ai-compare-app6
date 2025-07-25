import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AICompareApp() {
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    claude: "",
    gemini: ""
  });

  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState({
    openai: "",
    claude: "",
    gemini: ""
  });

  const askAllAIs = async () => {
    const headers = {
      "Content-Type": "application/json"
    };

    const fetchOpenAI = fetch("/api/openai", {
      method: "POST",
      headers,
      body: JSON.stringify({ key: apiKeys.openai, prompt: question })
    });

    const fetchClaude = fetch("/api/claude", {
      method: "POST",
      headers,
      body: JSON.stringify({ key: apiKeys.claude, prompt: question })
    });

    const fetchGemini = fetch("/api/gemini", {
      method: "POST",
      headers,
      body: JSON.stringify({ key: apiKeys.gemini, prompt: question })
    });

    const [openaiRes, claudeRes, geminiRes] = await Promise.all([
      fetchOpenAI.then((r) => r.json()),
      fetchClaude.then((r) => r.json()),
      fetchGemini.then((r) => r.json())
    ]);

    setResponses({
      openai: openaiRes.output,
      claude: claudeRes.output,
      gemini: geminiRes.output
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">🔍 AI Comparison Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="🔑 OpenAI API Key"
          value={apiKeys.openai}
          onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
        />
        <Input
          placeholder="🔑 Claude API Key"
          value={apiKeys.claude}
          onChange={(e) => setApiKeys({ ...apiKeys, claude: e.target.value })}
        />
        <Input
          placeholder="🔑 Gemini API Key"
          value={apiKeys.gemini}
          onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
        />
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={askAllAIs}>Ask</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">💬 ChatGPT</h2>
            <p className="whitespace-pre-wrap text-sm">{responses.openai}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">💬 Claude</h2>
            <p className="whitespace-pre-wrap text-sm">{responses.claude}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">💬 Gemini</h2>
            <p className="whitespace-pre-wrap text-sm">{responses.gemini}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}