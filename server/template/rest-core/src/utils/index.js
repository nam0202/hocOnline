const config = require('../../../rest-config').instance;
class Utils {
    static resourceIsExist(resource) {
        const resources = config.metadata('definitions');
        return resources
                .map( item => Object.keys(item)[0])
                .filter( item => item == resource )
                .length > 0;
    }
    static getResourceConfig(resource) {
        const resources = config.metadata('definitions');
        if (Utils.resourceIsExist(resource)) {
            return resources.filter(item => Object.keys(item)[0] == resource)
                        .map(item => item[resource])[0]
        }
        return null;
    }
    static isAvaiable(resource, method) {
        const resourceConfig = Utils.getResourceConfig(resource);
        if ( resourceConfig != null) {
            if (resourceConfig.api == 'all') return true;
            return resourceConfig.api.indexOf(method) >= 0
        }
        return false;
    }
    static hasRefs(resource) {
        const resourceConfig = Utils.getResourceConfig(resource);
        if ( resourceConfig != null) {
            return (resourceConfig.ref && resourceConfig.ref.length > 0)
        }
        return false;
    }
    static getRef(resource, ref) {
        const resourceConfig = Utils.getResourceConfig(resource);
        if (Utils.hasRefs(resource)) {
            const refs = resourceConfig.ref;
            return refs.map(item => {
                if (item.many && item.many == ref) {
                    // neu la many
                    return Object.assign(item, {type: 'many'})
                } else if (item.one && item.one == ref) {
                    // ney la one
                    return Object.assign(item, {type: 'one'})
                }
            }).filter(item => item)
        } else {
            return null;
        }
    }
    static flatten(list) {
        return list.reduce(
            (a, b) => a.concat(Array.isArray(b) ? Utils.flatten(b) : b), []
        );
    }
}
module.exports = Utils