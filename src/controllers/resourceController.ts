import { GetResourceDto } from 'dtos/resourceDtos/getResourceDTO';
import { ResourceIdDto } from 'dtos/resourceDtos/resourceIdDto';
import { UpdateResourceDto } from 'dtos/resourceDtos/UpdateResourceDto';
import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';

const resourceService = new ResourceService();

export class ResourceController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    const resource = await resourceService.createResource(name, description);
    res.status(201).json(resource);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { searchName } = req.query as GetResourceDto;
    const resources = await resourceService.getResources(searchName);
    res.status(200).json(resources);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as ResourceIdDto
    const resource = await resourceService.getResource(id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).send('Resource not found');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body as UpdateResourceDto;
    const { id } = req.params as unknown as ResourceIdDto

    const updatedResource = await resourceService.updateResource(id, name, description);
    if (updatedResource) {
      res.status(200).json(updatedResource);
    } else {
      res.status(404).send('Resource not found');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params as unknown as ResourceIdDto
    await resourceService.deleteResource(id);
    res.status(204).send();
  }
}
