import { recordMovement } from '../../../utils/inventory';export default defineEventHandler(event=>recordMovement(event,'OUT'))
