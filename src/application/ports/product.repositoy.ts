import { Product } from "@app/domain/product";

export abstract class ProductRepository {
    abstract findMany(): Promise<Product[]>;
    abstract create(data: Product): Promise<Product>;
}
