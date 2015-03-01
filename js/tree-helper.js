module.exports = {
    calcPosition(i, a, pos) {
        var n = a.take(i).reduce((p, c)=>p + c.totalChildren(), 1);
        return pos + n + i;
    },
    tubes(e, i, a, parent) {
        var isLastChild = i >= a.size - 1;
        var hasChildren = e.children.size !== 0;
        var expand = hasChildren ? "⊟" : "─";
        var createTubes = ()=> {
            //if (parent.contains("├")) {
            //    return ["│", "└"];
            //} else if (isLastChild) {
            //    return [" ", "└"];
            //} else if (parent.contains("└")) {
            //    return [" ", "├"];
            //}
            var n1 = parent.contains("├")? "│":" ";
            var n2 = isLastChild?"└":"├";
            return [n1,n2];
        };
        return parent.skipLast(2).concat(createTubes(), expand);
    }
};