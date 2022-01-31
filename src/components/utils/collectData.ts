import get from 'lodash/get';

export type FieldMappingConstant = {
  mappingType: 'CONSTANT',
  value: string
}

export type FieldMappingAPI = {
  mappingType: 'FIELD',
  apiName: string | string[]
}

export type FieldMapping = FieldMappingConstant | FieldMappingAPI

function processApiField(data: any, fieldMap: FieldMappingAPI): any {
  if (!Array.isArray(fieldMap.apiName)) {
    return get(data, fieldMap.apiName);
  }
  const apiNameWithData = fieldMap.apiName.find(apiName => get(data, apiName));
  return apiNameWithData
    ? get(data, apiNameWithData)
    :  undefined;
}

/**
 * Collects data based on the provided fields mappings
 * 
 * @examle
 * Suppose rawData is:
 * {
 *    faq: {
 *      question: 'Which AI search platform should we leverage?'
 *    } 
 * }
 * And the fieldMappings is:
 * {
 *    question: {
 *      mappingType: 'FIELD',
 *      apiName: 'faq.question,
 *    },
 *    answer: {
 *      mappingType: 'CONSTANT',
 *      value: 'Yext'
 *    }
 * }
 * The function will return:
 * { 
 *    question: 'Which AI search platform should we leverage?',
 *    answer: 'Yext'
 *  }
 * 
 * @param rawData The rawData from an {@link Result}
 * @param fieldMappings Indicates where data is located within the rawData field
 * @returns An object of fields to data
 */
export function collectData<FieldMappingObject extends Partial<Record<string, FieldMapping>> | undefined> (
  rawData: Record<string, unknown>,
  fieldMappings: FieldMappingObject,
) : Record<string, any> {

  if (!fieldMappings) {
    return {}
  }

  return Object.entries(fieldMappings as Record<string, FieldMapping>)
    .reduce((acc: Record<string, any>, [field, mapping]) => {
      if (mapping.mappingType === 'CONSTANT') {
        acc[field] = mapping.value;
      } else {
        acc[field] = processApiField(rawData, mapping);
      }
      return acc;
    }, {});
}