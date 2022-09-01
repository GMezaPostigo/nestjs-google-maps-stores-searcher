import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  LatLngLiteral,
  Place,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class MapsService {
  constructor(private readonly configService: ConfigService) {}

  async placeAutocomplete(address: string) {
    const client = new Client({});

    const placeAutocompleteResponse = await client.placeAutocomplete({
      params: {
        input: address,
        key: this.configService.get('google.apiKey'),
      },
      timeout: 1000,
    });

    return placeAutocompleteResponse.data.predictions;
  }

  async placesNearby(
    placeId: string,
    keyword: string,
  ): Promise<{ latLngLiteral: LatLngLiteral; stores: Place[] }> {
    const client = new Client({});

    try {
      const placeDetailsResponse = await client.placeDetails({
        params: {
          place_id: placeId,
          key: this.configService.get('google.apiKey'),
        },
        timeout: 1000,
      });

      const placesNearbyResponse = await client.placesNearby({
        params: {
          location: placeDetailsResponse.data.result.geometry?.location,
          keyword: keyword,
          radius: 2500,
          type: 'store',
          key: this.configService.get('google.apiKey'),
        },
        timeout: 1000,
      });

      return {
        latLngLiteral: placeDetailsResponse.data.result.geometry?.location,
        stores: placesNearbyResponse.data.results,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
