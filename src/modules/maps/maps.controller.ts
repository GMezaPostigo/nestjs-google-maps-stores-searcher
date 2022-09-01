import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MapsService } from './maps.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Maps')
@Controller({
  path: 'maps',
  version: '1',
})
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @ApiBearerAuth()
  @Get('placeAutocomplete/:address')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  placeAutocomplete(@Param('address') address: string) {
    return this.mapsService.placeAutocomplete(address);
  }

  @ApiBearerAuth()
  @Get('nearStores/:placeId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  nearStores(@Param('placeId') placeId: string) {
    return this.mapsService.placesNearby(placeId, 'smartphone');
  }
}
