type GeneratedArticle = {
  title: string;
  summary: string;
  link: string;
};

export function cleanResponse(response: string): GeneratedArticle[] {
  try {
    const cleaned = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      console.error("No JSON array found");
      console.error("Raw Gemini response:", response);

      return [];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.error("Raw Gemini response:", response);

    return [];
  }
}