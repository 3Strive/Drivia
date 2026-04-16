export class GenericResponseDto<T> {
  data: T;
  message: string;
  status: number;
}
