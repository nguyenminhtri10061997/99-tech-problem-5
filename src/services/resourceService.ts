import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ResourceModel } from '../models/resourceModel';

export class ResourceService {
    private resourceRepository = AppDataSource.getRepository(ResourceModel)

    async createResource(name: string, description: string): Promise<ResourceModel> {
        const resource = this.resourceRepository.create({ name, description });
        return this.resourceRepository.save(resource);
    }

    async getResources(searchName?: string): Promise<ResourceModel[]> {
        return this.resourceRepository.find({ where: searchName ? { name: Like(`%${searchName}%`) } : {} });
    }

    async getResource(id: number): Promise<ResourceModel | null> {
        return this.resourceRepository.findOneBy({ id });
    }

    async updateResource(id: number, name?: string, description?: string): Promise<ResourceModel | undefined> {
        const resource = await this.resourceRepository.findOneBy({ id });
        if (resource) {
            if (name) {
                resource.name = name;
            }
            if (description) {
                resource.description = description;
            }
            return this.resourceRepository.save(resource);
        }
        return undefined;
    }

    async deleteResource(id: number): Promise<void> {
        // For real project create DB for use softDelete (alway keep client data)
        await this.resourceRepository.delete(id);
    }
}
