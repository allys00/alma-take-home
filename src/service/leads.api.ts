// TODO: Maybe Replace this for Axios or React Query

import { AssessmentSchema } from "@/app/assessment/assessment.definitions";
import { Lead } from "@/definitions/lead";


export const getLeads = async () => {
    return await fetch('/api/leads')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}


export const postLeads = async (data: AssessmentSchema): Promise<Lead> => {
    return await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}