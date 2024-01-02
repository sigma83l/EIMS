import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { StudentRepository } from './student.repository';
import { ImageService } from '../image/image.service';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository, private readonly imageService: ImageService) {}

  async create(user) {
    return await this.studentRepository.upsert(user);
  }

  async findAll() {
    const students = await this.studentRepository.findAll();

    const studentsWithImage = students.map(async (student) => {
      const image = await this.imageService.findByIdOrThrowExpection(student.id);
      return {
        ...student,
        image: {...image},
      };
    });
    return studentsWithImage;
  }

  async findOne(id: number) {
    const student =  await this.studentRepository.findUnique(id);
    const image = await this.imageService.findByIdOrThrowExpection(student.id);
    return {
      ...student,
      image: {...image},
    };
  }
  async findByEmail(email: string) {
    const student =  await this.studentRepository.findByEmail(email);
    const image = await this.imageService.findByIdOrThrowExpection((await student).student.id);
    return {
      ...student,
      image: {...image},
    };
  }
}
