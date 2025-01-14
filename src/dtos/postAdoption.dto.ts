export interface postAdoptionDto {
    name: string;
    details: string;
    compatibility: string;
    location: string;
    housingSituation: string;
    experience: boolean;
    request_date?: Date;
    status?: string;
    adopter_id?: string;
    animal_id: string;
}