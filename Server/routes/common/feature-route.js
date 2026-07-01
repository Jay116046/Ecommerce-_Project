import express from "express"
import { addFeature, deleteFeature, getFeature } from "../../controllers/common/feature-controller.js";

const featureRoute = express.Router();

featureRoute.get('/getFeature',getFeature);
featureRoute.post('/addFeature',addFeature);
featureRoute.get('/deleteFeature/:id',deleteFeature);

export default featureRoute