const OpenAI = require('openai');

const analyzeResumeWithAI = async (text) => {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const prompt = `You are an expert recruiter AI. Analyze the resume and return:
- summary
- recommended_roles (array of objects with: role, fit_score (integer out of 100), reason)
- strong_skills (array of strings)
- missing_skills (array of strings)
- skill_gaps_for_roles (array of objects with role, missing_skills)
- resume_improvements (array of strings)
- additional_roles_to_target (array of strings)
- ats_score (a basic estimated ATS score out of 100 based on standard formatting and keyword match likelihood)

Return STRICT JSON.

Resume Context:
${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const parsedData = JSON.parse(response.choices[0].message.content);
    return parsedData;
  } catch (error) {
    console.error("Groq/OpenAI API Error:", error);
    throw new Error('Failed to analyze resume with AI');
  }
};

module.exports = { analyzeResumeWithAI };
