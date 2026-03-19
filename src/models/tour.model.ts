import mongoose, { Document } from 'mongoose'
import slugify from 'slugify'

enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	DIFFICULT = 'difficult'
}

export interface ITourSchema extends Document {
	name: string
	slug?: string
	duration: number
	maxGroupSize: number
	difficulty: Difficulty
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	priceDiscount: number
	summary: string
	description?: string
	imageCover: string
	images: Array<string>
	createdAt: Date
	startDates: Array<Date>
	secretTour: boolean
	// Виртуальные поля
	// Поле для middleware
}

const tourSchema = new mongoose.Schema<ITourSchema>(
	{
		name: {
			type: String,
			required: [true, 'Тур должен иметь поле: name'],
			unique: true,
			trim: true,
			minlength: [10, 'Тур должен иметь больше 10 символов'],
			maxlength: [40, 'Тур должен иметь меньше или 40 символов']
		},

		slug: String,

		duration: {
			type: Number,
			required: [true, 'Тур должен иметь поле: duration']
		},

		maxGroupSize: {
			type: Number,
			required: [true, 'Тур должен иметь поле: maxGroupSize']
		},

		difficulty: {
			type: String,
			required: [true, 'Тур должен иметь поле: difficulty'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Поле difficulty должно иметь поля: easy, medium, difficult'
			}
		},

		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Поле ratingsAverage должно быть больше > 1.0'],
			max: [5, 'Поле ratingsAverage должно быть меньше < 5.0']
		},

		ratingsQuantity: {
			type: Number,
			default: 0
		},

		price: {
			type: Number,
			required: [true, 'Тур должен иметь поле: price']
		},

		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val: number): boolean {
					console.log('val:::', val)
					const doc = this as ITourSchema
					return val < doc.price
				},
				message: 'Поле priceDiscount ({VALUE}) должно быть меньше поля price'
			}
		},

		summary: {
			type: String,
			trim: true,
			required: [true, 'Тур должен иметь поле: summary']
		},

		description: {
			type: String,
			trim: true
		},

		imageCover: {
			type: String,
			required: [true, 'Тур должен иметь поле: imageCover']
		},

		images: [String],

		createdAt: {
			type: Date,
			default: Date.now(),
			select: false
		},

		startDates: [Date],

		secretTour: {
			type: Boolean,
			default: false
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

// DOCUMENT MIDDLEWARE: функция сработает перед .save() и .create()
tourSchema.pre('save', function (this) {
	this.slug = slugify(this.name, { lower: true })
})
export const Tour = mongoose.model('Tour', tourSchema)
