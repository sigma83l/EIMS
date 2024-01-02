import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CoordinatorRepository } from './coordinator.repository';
import { AssessmentCriteriaDto } from './dto/assessment.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class CoordinatorService {
  constructor(private readonly coordinatorRepository: CoordinatorRepository, private readonly imageService: ImageService) {}

  async create(user) {
    return await this.coordinatorRepository.upsert(user);
  }

  async findAll() {
    const coordinators = await this.coordinatorRepository.findAll();

    const coordinatorsWithImage = coordinators.map(async (coordinator) => {
      const image = await this.imageService.findByIdOrThrowExpection(coordinator.id);
      return {
        ...coordinator,
        image: {...image},
      };
    });
    return coordinators;
  }

  async findOne(id: number) {
    const coordinator =  await this.coordinatorRepository.findUnique(id);
    const image = await this.imageService.findByIdOrThrowExpection(coordinator.id);
    return {
      ...coordinator,
      image: {...image},
    };
  }
  async getAllDepartments(){
    return await this.coordinatorRepository.getAllDepartments();
  }
  async findByEmail(email: string) {
    return await this.coordinatorRepository.findByEmail(email);
  }
  async AssessStudent(assessmentCriteriaDto: AssessmentCriteriaDto) {
    return await this.coordinatorRepository.AssessStudent(assessmentCriteriaDto);
  }
}
