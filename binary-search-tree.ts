export class BinarySearchTree {

    constructor(public data: any, public lat: number, public long: number){};

    public left: BinarySearchTree = null;
    public right: BinarySearchTree = null;

    insert(data, lat, long) {
        if (lat <= this.lat) {
            if (!this.left) this.left = new BinarySearchTree(data, lat, long);
            else this.left.insert(data, lat, long);
        }
        else if (lat > this.lat) {
            if (!this.right) this.right = new BinarySearchTree(data, lat, long);
            else this.right.insert(data, lat, long);
        }
    }

    contains(lat): Boolean {
        if (this.lat === lat) return true;
        if (lat < this.lat) {
            if (!this.left) return false;
            else return this.left.contains(lat);
        }
        else if (lat > this.lat) {
            if (!this.right) return false;
            else return this.right.contains(lat);
        }
    }

    depthFirstTraversal(iteratorFunc, order) {
        if (order === 'pre-order') iteratorFunc(this);
        if (this.left) this.left.depthFirstTraversal(iteratorFunc, order);
        if (order === 'in-order') iteratorFunc(this);
        if (this.right) this.right.depthFirstTraversal(iteratorFunc, order);
        if (order === 'post-order') iteratorFunc(this);
    };
       
    breadthFirstTraversal(iteratorFunc) {
        let queue: BinarySearchTree[] = [this];
        while (queue.length) {
            let treeNode = queue.shift();
            iteratorFunc(treeNode);
            if (treeNode.left) queue.push(treeNode.left);
            if (treeNode.right) queue.push(treeNode.right);
        }
    };
       
    getMinVal() {
        if (this.left) return this.left.getMinVal();
        else return this.lat;
    };
       
    getMaxVal() {
        if (this.right) return this.right.getMaxVal();
        else return this.lat;
    };

};

