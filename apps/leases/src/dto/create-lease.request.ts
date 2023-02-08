import { IsString, IsNotEmpty } from "class-validator";


export class CreateLeaseRequest {
    @IsString()
    @IsNotEmpty()
    landlordName:string;
    
    @IsString()
    @IsNotEmpty()
    propertyName:string;
    
    @IsString()
    @IsNotEmpty()
    propertyAddress:string;
    
    @IsString()
    @IsNotEmpty()
    tenantName:string;
}