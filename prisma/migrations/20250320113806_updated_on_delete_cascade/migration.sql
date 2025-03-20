-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoriesOnPosts" (
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("postId", "categoryId"),
    CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnPosts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CategoriesOnPosts" ("categoryId", "postId") SELECT "categoryId", "postId" FROM "CategoriesOnPosts";
DROP TABLE "CategoriesOnPosts";
ALTER TABLE "new_CategoriesOnPosts" RENAME TO "CategoriesOnPosts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
