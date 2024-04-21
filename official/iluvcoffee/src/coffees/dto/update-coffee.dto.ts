// export class UpdateCoffeeDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavors?: string[];
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

//PartialTypes marks all the property optional and also inherits all the validation rule
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
