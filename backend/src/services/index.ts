import { RunnableSequence } from "@langchain/core/runnables";
import { generateMongoQuery } from "./gemini-query.service";
import { executeDBQuery } from "./mongo-execute-query.service";
import { generateAnswer } from "./gemini-answer.service";

export class AIService {
    static async prompt(
        data: { question: string },
    ): Promise<any> {
        const chain = RunnableSequence.from([
            generateMongoQuery.bind(this),
            executeDBQuery.bind(this),
            generateAnswer.bind(this),
        ]);

        const result = await chain.invoke(data.question);

        return result;
    }
}