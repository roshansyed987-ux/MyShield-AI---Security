
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeAppThreat = async (appName: string, behavior: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this app for security risks in an isolated environment. App Name: ${appName}. Description/Behavior: ${behavior}. 
      Identify risks related to spyware, bloatware, or hijacking. Focus on unwanted privacy disturbances.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: 'low, medium, high, critical' },
            concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
            isUnwanted: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING }
          },
          required: ["riskLevel", "concerns", "isUnwanted", "explanation"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const analyzePrivacyLeaks = async (logData: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Examine this device activity log for unwanted privacy disturbances, hidden trackers, or silent telemetry: "${logData}". 
      List the specific unwanted items found and categorize them by impact.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            leaks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  app: { type: Type.STRING },
                  type: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  details: { type: Type.STRING }
                },
                required: ["app", "type", "impact", "details"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["leaks", "summary"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Privacy Analysis Error:", error);
    return null;
  }
};

export const analyzeSystemApp = async (packageName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the Android system package: ${packageName}. Determine if it is essential for OS stability or if it is non-essential bloatware/telemetry that is safe to disable/remove. 
      Identify its purpose and any privacy concerns.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafeToRemove: { type: Type.BOOLEAN },
            appType: { type: Type.STRING, description: 'Core System, Bloatware, Telemetry, Manufacturer App' },
            riskOfRemoval: { type: Type.STRING, description: 'High, Medium, Low' },
            description: { type: Type.STRING },
            concerns: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["isSafeToRemove", "appType", "riskOfRemoval", "description", "concerns"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini System App Analysis Error:", error);
    return null;
  }
};

export const runHijackDiagnostic = async (symptoms: string[]) => {
  try {
    const prompt = `A user reports the following symptoms on their mobile device: ${symptoms.join(', ')}. 
    Analyze the probability of device hijacking (SIM swapping, remote access, spyware).
    Explain common indicators of these threats and provide actionable advice.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class cybersecurity expert specializing in mobile forensic analysis. Provide clear, technical yet accessible advice."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Hijack Diagnostic Error:", error);
    return "Analysis failed. Please check your connection.";
  }
};

export const checkControlIndicators = async (deviceDetails: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Based on these device details: ${deviceDetails}, identify if the device is likely under MDM (Mobile Device Management) or unauthorized third-party control.`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    return "Audit failed.";
  }
};
