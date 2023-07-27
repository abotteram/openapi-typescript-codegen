import camelCase from 'camelcase';

/**
 * Convert the input value to a correct operation (method) classname.
 * This will use the operation ID - if available - and otherwise fallback
 * on a generated name from the URL
 */
export const getOperationName = (url: string, method: string, operationId?: string): string => {
    console.log(url, method, operationId);

    if (operationId) {
        return camelCase(
            operationId
                .replace(/^[^a-z]+/gi, '')
                .replace(/[^\w\-]+/g, '-')
                .trim()
        );
    }

    let urlWithoutPlaceholders = url
        .replace(/[^/]*?{api-version}.*?\//g, '')
        .replace(/{(.*?)}/g, '')
        .replace(/\//g, '-');

    // Remove invalid characters
    urlWithoutPlaceholders = urlWithoutPlaceholders
        .split('-')
        .map(part => {
            return part.replace(/^[^a-z]+/gi, '');
        })
        .join('-');

    return camelCase(`${method}-${urlWithoutPlaceholders}`);
};
