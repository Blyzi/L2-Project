import { ACTIONS } from '../../shared/enum/Actions';
import { IsArray, ArrayContains } from 'class-validator';

const actionsArray = Object.values(ACTIONS);

export class Permissions {
  @IsArray()
  @ArrayContains(actionsArray)
  buy: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  client: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  event: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  item: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  product: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  role: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  team: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  thingtype: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  use: ACTIONS[];

  @IsArray()
  @ArrayContains(actionsArray)
  user: ACTIONS[];
}
