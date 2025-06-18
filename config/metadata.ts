import { merge } from 'lodash';
import { Metadata } from 'next';

export const DEFAULT_METADATA: Metadata = {
	title: "Shoppe - интернет-магазин"
};

export const combineWithDefaultMetadata = (pageMetadata: Metadata = {}): Metadata => {
	return merge({}, DEFAULT_METADATA, pageMetadata);
}