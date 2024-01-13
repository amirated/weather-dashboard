export interface ObjectType {
    [key: string]: any
}
  
export type LocationKeyType = string | undefined;

export type LocationItemType = {
    key: string | undefined;
    name: string;
    country: string;
    temperature: number;
    description: string;
    icon: string;
};

export type LocationListType = LocationItemType[] | undefined;