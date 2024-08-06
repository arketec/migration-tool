import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMigration } from '../../../migration-tool-common/src';

@Schema()
export class ConductorWorkflowMigration implements IMigration {
  @Prop({ required: true })
  fileName: string;
  @Prop({ required: true })
  hash: string;
  @Prop({ required: true, type: Date, default: Date.now })
  applied: Date;
  @Prop({ required: true })
  appliedBy: string;

  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  version: number;
  @Prop({ required: true, default: 'anonymous' })
  author: string;
}

const ConductorWorkflowMigrationSchema = SchemaFactory.createForClass(
  ConductorWorkflowMigration,
);
ConductorWorkflowMigrationSchema.index({ fileName: 1 }, { unique: true });
ConductorWorkflowMigrationSchema.index({ appliedBy: 1 });
ConductorWorkflowMigrationSchema.index({ name: 1 });
ConductorWorkflowMigrationSchema.index({ name: 1, version: 1 });
ConductorWorkflowMigrationSchema.index({ author: 1 });
ConductorWorkflowMigrationSchema.index({ name: 1, author: 1 });
ConductorWorkflowMigrationSchema.index({ name: 1, version: 1, author: 1 });
export { ConductorWorkflowMigrationSchema };
