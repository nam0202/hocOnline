const DBConnector = require('../../rest-db');
const connector = DBConnector.instance;
class Model {
    constructor(tableName) {
        this.tableName = tableName;
        this.db = connector.getConnect();
        this.ref = connector.getRef(this.tableName);
    }
    get(id) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id}).select('*')
            .then( res => resolve(res[0]))
            .catch( err => reject(err));
        })
    }
    countRef(refData, id) {
        return new Promise((resolve, reject) => {
            const ref = refData[refData.type];
            const key = refData['key'];
            let query = this.db(this.tableName).count('*');
            if (refData.type == 'many') {
                query
                    .innerJoin(ref, `${this.tableName}.id`, `${ref}.${key}`)
                    .where(key, id)
            } else {
                query
                    .innerJoin(ref, `${this.tableName}.${key}`, `${ref}.id`)
                    .where(`${this.tableName}.id`, id)
            }
            query
                .then(res => resolve(res[0]['count(*)']))
                .catch(err => reject(err));
        })

    }

    getRef(refData, id, page, limit, options) {
        return new Promise((resolve, reject) => {
            const ref = refData[refData.type];
            const key = refData['key'];
            let column = this.getColumn(options);
            column.push(`${ref}.*`);
            const refsOtherTable = connector.getRef(ref);
            let query = this.db(this.tableName);
            if (refData.type == 'many') {
                query.innerJoin(ref, `${this.tableName}.id`, `${ref}.${key}`)
                //join with ref and other table
                for (let i = 0; i < options.length; i++) {
                    let key = this.getKeyRef(options[i].ref, refsOtherTable);
                    query = query.innerJoin(`${options[i].ref}`, `${ref}.${key}`, `${options[i].ref}.id`)
                }
                query.select(column)
                    .limit(limit)
                    .where(key, id)
                    .offset(((page - 1) * limit))
            } else {
                query
                    .innerJoin(ref, `${this.tableName}.${key}`, `${ref}.id`)
                    .where(`${this.tableName}.id`, id)
                    .select(`${ref}.*`)
            }
            query.then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
    getAll() {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    add(data) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).returning('id').insert(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    update(data) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id: data.id}).update(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    del(id) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id: id}).del()
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    count() {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).count('id')
            .then( res => resolve(res[0]['count(`id`)']))
            .catch( err => reject(err));
        })
    }

    getColumn(options) {
        let selectColumn = [];
        options.forEach(item => {
            let Object = {};
            Object[`${item.ref}_${item.value}`] = item.ref + '.' + item.value;
            selectColumn.push(Object);
        });
        return selectColumn;
    }
    getKeyRef(ref, refs) {
        let listRefs = refs || this.ref;
        return listRefs.find((item) => {
            if (!!item.one) {
                return item.one === ref;
            } else {
                return item.many === ref;
            }
        }).key;
    }

    getPage(page, limit, fields, options) {
        const sort = fields.sort;
        delete fields.sort;
        let column = this.getColumn(options);
        column.push(`${this.tableName}.*`);
        return new Promise((resolve, reject) => {
            let query = this.db(this.tableName).select(column);
            for (let i = 0; i < options.length; i++) {
                let key = this.getKeyRef(options[i].ref);
                query = query.innerJoin(`${options[i].ref}`, `${this.tableName}.${key}`, `${options[i].ref}.id`)
            }
            if (sort === 'desc') {
                query = query.orderBy(`${this.tableName}.id`, sort)
            }

            query.where(function () {
                for (let field in fields) {
                    if (!!parseInt(fields[field])) {
                        this.where(field.toString(), fields[field])
                    } else {
                        this.where(field.toString(), 'like', `%${fields[field]}%`)
                    }
                }
            })
                .limit(limit).offset(((page - 1) * limit))
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
}
module.exports = Model