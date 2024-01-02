import { Injectable } from '@nestjs/common';
import { SuperviserRepository } from './superviser.repository';
import { AssessmentCriteriaDto } from './dto/assessment.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class SuperviserService {
    constructor(private readonly superviserRepository: SuperviserRepository, private readonly imageService: ImageService) {}

    async create(user) {
      return await this.superviserRepository.upsert(user);
    }
  
    async findAll() {
      const supervisers = await this.superviserRepository.findAll();
  
      const supervisersWithImage = supervisers.map(async (superviser) => {
        const image = await this.imageService.findByIdOrThrowExpection(superviser.id);
        return {
          ...superviser,
          image: {...image},
        };
      });
      return supervisersWithImage;
    }
  
    async findOne(id: number) {
      const superviser =  await this.superviserRepository.findUnique(id);
      const image = await this.imageService.findByIdOrThrowExpection(superviser.id);
      return {
        ...superviser,
        image: {...image},
      };
    }
    async findByEmail(email: string) {
      const superviser =  await this.superviserRepository.findByEmail(email);
      const image = await this.imageService.findByIdOrThrowExpection((await superviser).supervisor.id);
      return {
        ...superviser,
        image: {...image},
      };
    }

    async AssessStudent(assessmentCriteriaDto: AssessmentCriteriaDto) {
      return await this.superviserRepository.AssessStudent(assessmentCriteriaDto);
    }
}
