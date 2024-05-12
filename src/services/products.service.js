import axios from "axios"

class ProductsService {
	#URL = 'https://64861b03a795d24810b7b7ef.mockapi.io/items'

	async getProducts () {
		const {data} = await axios.get(this.#URL)
		return data
	}
}

export const productService = new ProductsService();