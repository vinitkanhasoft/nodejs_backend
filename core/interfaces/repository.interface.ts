export interface IRepository<Entity> {
  create(entity: Entity): Promise<Entity>;
  findById(id: string): Promise<Entity | null>;
  update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
  delete(id: string): Promise<boolean>;
}
