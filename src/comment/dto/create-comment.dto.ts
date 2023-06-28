import { IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment: string;

    @IsString()
    post_id: string;
}
