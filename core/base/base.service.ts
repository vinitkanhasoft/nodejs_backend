export abstract class BaseService<Entity> {
  abstract create(entity: Entity): Promise<Entity>;
  abstract findById(id: string): Promise<Entity | null>;
  abstract update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
  abstract delete(id: string): Promise<boolean>;
}
