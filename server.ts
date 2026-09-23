import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const getAppDirname = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch {}
  return process.cwd();
};
const __dirname = getAppDirname();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Clear Title Uganda API",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Chatbot endpoint strictly bounded to Ugandan Land Law, verification, fraud & escrow
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "English", userContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    // Plain fallback answers if Gemini is unavailable
    const fallbackResponses: Record<string, string> = {
      caveat: "In Ugandan law under the Registration of Titles Act (RTA), a caveat is an official warning or freeze placed on a land register. It alerts prospective buyers that someone else claims an interest (e.g. family claim, uncompleted sale, court dispute). You should never purchase land with an active caveat without legal removal.",
      tenure: "Uganda has 4 constitutional land tenure systems:\n1. Mailo: Predominant in Buganda/central. Features ownership in perpetuity, often with lawful/bonafide occupants (bibanja holders).\n2. Freehold: Full ownership in perpetuity.\n3. Leasehold: Ownership for a defined period (e.g. 49 or 99 years) with ground rent.\n4. Customary: Governed by local clan/community traditions, can be converted to freehold.",
      mailo: "Mailo land ownership grants ownership in perpetuity, but often involves dual rights: the registered title owner and lawful 'bibanja' tenants. You must verify if bibanja occupants exist, as their rights are protected by the Land Act.",
      fraud: "Common land fraud warning signs in Uganda include: seller rushing for cash payment without physical boundary opening; unregistered powers of attorney; forged search certificates; selling without spousal consent; and overlapping surveys on wetlands/forest reserves.",
      escrow: "Clear Title Escrow holds buyer funds in a regulated bank trust account until the Ministry of Lands confirms successful registration and issuance of a genuine Title Deed. If the title is encumbered or fraudulent, your funds are safely refunded.",
    };

    if (!ai) {
      // Build an intelligent context-aware answer from fallback knowledge base
      const lower = message.toLowerCase();
      let reply = "Hello! I am your Clear Title Uganda Land Advisor. ";

      if (userContext?.activeCases && lower.includes("plot") || lower.includes("case") || lower.includes("status")) {
        const found = userContext.activeCases[0];
        if (found) {
          reply += `Regarding your active case for ${found.parcelId} in ${found.district}: The current stage is "${found.stage}" with a Deal Risk Score of ${found.riskScore}/100. `;
        }
      }

      if (lower.includes("caveat")) {
        reply += fallbackResponses.caveat;
      } else if (lower.includes("mailo") || lower.includes("tenure") || lower.includes("freehold") || lower.includes("leasehold") || lower.includes("customary")) {
        reply += fallbackResponses.tenure;
      } else if (lower.includes("fraud") || lower.includes("scam") || lower.includes("warning") || lower.includes("fake")) {
        reply += fallbackResponses.fraud;
      } else if (lower.includes("escrow") || lower.includes("money") || lower.includes("funds")) {
        reply += fallbackResponses.escrow;
      } else {
        reply += "I specialize strictly in Ugandan land law, title search verification, deed inspection, boundary opening, and fraud prevention under the Registration of Titles Act. How can I assist you with your land purchase or ownership in Uganda today?";
      }

      return res.json({
        reply,
        disclaimer: "General educational information only. Not a substitute for advice from a licensed advocate of the High Court of Uganda.",
      });
    }

    // Prepare system instructions with strict scope discipline and multilingual instructions
    const systemInstruction = `You are the specialized AI Land Law & Title Verification Advisor for "Clear Title Uganda".
STRICT BOUNDARY DIRECTIVE:
- You must ONLY answer questions directly related to Ugandan land law, land tenure systems (Mailo, Freehold, Leasehold, Customary), Land Act (1998 as amended), Registration of Titles Act (Cap 230), physical boundary verification, caveat filing/searches, spousal consent rules, bibanja occupants, land fraud prevention, escrow protection, and interpreting Clear Title Risk Scores.
- If a user asks about anything outside Ugandan land law, property verification, and the Clear Title platform (such as general knowledge, cooking, code, politics, non-land topics), politely and firmly refuse and redirect them back: "I can only answer questions related to Ugandan land law, title verification, fraud protection, and your property verification cases on Clear Title Uganda."
- Tone: Short, plain, reassuring, non-legal language. Maximum 2 to 3 concise paragraphs or bullet points. Explain concepts simply so non-lawyers and diaspora buyers understand.
- Provide response in the requested language: "${language}" (Languages supported: English, Luganda, Runyankole, Acholi, Ateso, Lango, Swahili).
- Disclaimer: Always ensure the advice is understood as general guidance and not formal court representation.
${userContext?.activeCases?.length ? `The user has the following active verification cases on their Clear Title account: ${JSON.stringify(userContext.activeCases)}. If they ask about their property or case status, you may reference these details directly and accurately.` : ""}`;

    let reply: string;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });
      reply = response.text || "I am available to assist with your Ugandan land title questions.";
    } catch (genErr) {
      console.warn("Gemini generation error, falling back to local land knowledge base:", genErr);
      const lower = message.toLowerCase();
      reply = "Clear Title Uganda Land Advisory: ";
      if (lower.includes("caveat")) {
        reply += fallbackResponses.caveat;
      } else if (lower.includes("mailo") || lower.includes("tenure") || lower.includes("freehold") || lower.includes("leasehold") || lower.includes("customary")) {
        reply += fallbackResponses.tenure;
      } else if (lower.includes("fraud") || lower.includes("scam") || lower.includes("warning") || lower.includes("fake")) {
        reply += fallbackResponses.fraud;
      } else if (lower.includes("escrow") || lower.includes("money") || lower.includes("funds")) {
        reply += fallbackResponses.escrow;
      } else {
        reply += "Under the Land Act (Cap 227) and Registration of Titles Act (Cap 230), all land conveyances in Uganda require verifying the White Page at the Ministerial Zonal Office, inspecting boundary beacons with a registered surveyor, and executing spousal consent before releasing payment.";
      }
    }

    res.json({
      reply,
      disclaimer: "General educational information only. Not a substitute for advice from a licensed advocate of the High Court of Uganda.",
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "Unable to process land inquiry at this moment.",
      disclaimer: "General educational information only.",
    });
  }
});

// Abstracted National Land Registry (MLHUD / NLIS) Interface Mock / Adapter
// Designed so future API integrations connect cleanly here without UI refactoring
app.post("/api/registry-check", async (req, res) => {
  const { district, county, block, plot, searchType } = req.body;

  // Simulate official Ministry of Lands search verification
  const isHighRisk = block === "999" || plot === "999";
  const isCaveat = block === "404";

  const result = {
    registryRef: `NLIS-${Date.now().toString().slice(-6)}`,
    queryTimestamp: new Date().toISOString(),
    district: district || "Wakiso",
    county: county || "Busiro",
    block: block || "102",
    plot: plot || "45",
    tenure: district === "Gulu" ? "Customary / Freehold" : "Mailo Register",
    encumbrances: isCaveat ? ["Caveat registered by Court Injunction (Suit 2024/09)"] : [],
    status: isHighRisk ? "FLAGGED_DISCREPANCY" : isCaveat ? "ENCUMBERED_CAVEAT" : "CLEARED_ON_REGISTER",
    source: "Uganda National Land Information System (NLIS) Abstracted Gateway",
  };

  res.json(result);
});

// Vite middleware in dev or static files in production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Clear Title Uganda Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
