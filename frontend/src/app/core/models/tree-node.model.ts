export interface TreeNode {
    readonly text: string;
    readonly query: string;
    readonly children?: readonly TreeNode[];
}