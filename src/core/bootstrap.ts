import { ExampleService } from "@/application/services/example.service";
import { ExampleRepository } from "@/infra/repositories/example.repository";
import { register } from "./container";

export function bootstrap(): void {
  // infra
  register("ExampleRepository", new ExampleRepository());

  // application
  register("ExampleService", new ExampleService());
}
