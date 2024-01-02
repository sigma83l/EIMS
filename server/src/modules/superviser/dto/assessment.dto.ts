import { IsEnum, IsString, IsInt, IsNotEmpty} from 'class-validator';
import { Scores, SuperviserAssessment } from '@prisma/client';

export class AssessmentCriteriaDto {

    @IsInt()
    @IsNotEmpty()
    studentId: number;

    @IsString()
    @IsEnum(Scores, { each: true})
    qualityOfStudentInternshipReport: Scores;

    @IsString()
    @IsEnum(Scores, { each: true})
    experienceGained: Scores;

    @IsString()
    @IsEnum(Scores, { each: true})
    presentation: Scores;

    @IsString()
    @IsEnum(Scores, { each: true})
    visualPresentationAid: Scores;

    @IsString()
    @IsEnum(Scores, { each: true})
    overalAssessmentResult: Scores;
}
