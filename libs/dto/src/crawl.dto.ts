import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsBoolean, IsOptional} from "class-validator";

export class CrawlDto {
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    performWipe: boolean
}