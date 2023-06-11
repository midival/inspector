import "reflect-metadata";
const formatMetadataKey = Symbol("format");

const CC = Symbol('midi:cc')


function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}


export const midi = {
    cc: function(data: number) {
        return function(target) {
            console.log('TARGET', )
            console.log('Defining CC', data)
        }
    }
}