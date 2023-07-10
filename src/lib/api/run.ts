import axios from "axios";
import env from "./env";

const run = async () => {
    const bases = await getAirtableBases();
    
    // Intentionally an async loop. This would usually be bad for performance but
    // in this case it helps us avoid getting rate limited by the Airtable API
    for (const base of bases) {
        const schema = await getAirtableBaseSchema(base.id);

        // TODO: verification here
        // Currently blocked on Airtable not giving us the base description,
        // which is needed to figure out the ownership chain
    }
}

/* https://airtable.com/developers/web/api/list-bases#response-bases */
type Bases = {
    id: string,
    name: string,
    permissionLevel: "none" | "read" | "comment" | "edit" | "create",
}[];

const getAirtableBases = async (): Promise<Bases> => {
    const res = await axios<{ bases: Bases }>({
      url: `https://api.airtable.com/v0/meta/bases`,
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    });  
    return res.data.bases;
};

/* https://airtable.com/developers/web/api/get-base-schema#response-tables */
type BaseSchema = {
    id: string,
    primaryFieldId: string,
    name: string;
    description: string | undefined;
    fields: {
        id: string,
        type: string,
        name: string,
        description: string | undefined,
        options: unknown,
    }[];
    views: {
        id: string,
        type: string,
        name: string,
        visibleFieldIds: string[] | undefined;
    }
}[];

const getAirtableBaseSchema = async (baseId: string): Promise<BaseSchema> => {
    const res = await axios<{ tables: BaseSchema }>({
      url: `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    });  
    return res.data.tables;
};

export default run;