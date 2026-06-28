import express from "express"
import { addFeature, getFeature } from "../../controllers/common/feature-controller.js";

const featureRoute = express.Router();

featureRoute.get('/getFeature',getFeature);
featureRoute.post('/addFeature',addFeature);


export default featureRoute