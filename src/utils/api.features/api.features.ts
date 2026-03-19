import { Query } from 'mongoose'
import qs from 'qs'

interface QueryString {
	page?: string
	sort?: string
	limit?: string
	fields?: string
	[key: string]: any
}

export class APIFeatures<T> {
	// Объект запроса mongoose
	public query: Query<T[], T>
	// req.query из Express
	queryString: QueryString

	constructor(query: Query<T[], T>, queryString: QueryString) {
		this.query = query
		this.queryString = queryString
	}

	// url: /api/v1/tours?price[gte]=500&price[lte]=1000&sort=-price,ratingsAverage&fields=name,price

	// ?price[gte]=500&price[lte]=1000
	filter(): this {
		const queryObj = qs.parse(this.queryString)
		const excludedFields = ['page', 'sort', 'limit', 'fields']
		excludedFields.forEach((el) => delete queryObj[el])

		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
		this.query = this.query.find(JSON.parse(queryStr))

		return this
	}

	// ?sort=-price,ratingsAverage
	sort(): this {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ')
			this.query = this.query.sort(sortBy)
		} else {
			this.query = this.query.sort('-createdAt')
		}

		return this
	}

	// ?fields=price,name
	limitFields(): this {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ')
			this.query = this.query.select(fields)
		} else {
			this.query = this.query.select('-__v')
		}
		return this
	}

	paginate(): this {
		const page = Number(this.queryString.page) || 1
		const limit = Number(this.queryString.limit) || 100
		const skip = (page - 1) * limit

		this.query = this.query.skip(skip).limit(limit)

		return this
	}
}
