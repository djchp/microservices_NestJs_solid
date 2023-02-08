import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema({ versionKey: false })
export class Lease extends AbstractDocument {
    @Prop()
    landlordName: string
    
    @Prop()
    propertyName: string

    @Prop()
    propertyAddress: string

    // @Prop()
    // startTime: Date

    // @Prop()
    // endTime: Date
    @Prop()
    tenantName: string

}
export const LeaseSchema = SchemaFactory.createForClass(Lease)