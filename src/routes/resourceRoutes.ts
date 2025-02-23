import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';
import { CreateResourceDto } from '../dtos/resourceDtos/createResourceDTO';
import { GetResourceDto } from '../dtos/resourceDtos/getResourceDTO';
import { ResourceIdDto } from '../dtos/resourceDtos/resourceIdDto';
import { UpdateResourceDto } from '../dtos/resourceDtos/UpdateResourceDto';
import { validateDto } from '../middlewares/validateDto';

const router = Router();
const resourceController = new ResourceController();

router.get('/resources', validateDto(GetResourceDto, 'query'), resourceController.getAll);
router.get('/resource/:id', validateDto(ResourceIdDto, 'params'), resourceController.getOne);
router.post('/resource', validateDto(CreateResourceDto), resourceController.create);
router.put('/resource/:id', validateDto(ResourceIdDto, 'params'), validateDto(UpdateResourceDto), resourceController.update);
router.delete('/resource/:id', validateDto(ResourceIdDto, 'params'), resourceController.delete);

export default router;
