# **git 多人协作发布流程**

##### 仓库一共维护2个固定分支。

- master 分支，是线上版本的代码库。只接受合并请求，不接受push 提交，用作发布正式环境版本的代码库。

- dev 分支，是开发测试版本的代码库（包含多个人的功能开发，bug修复，紧急任务的代码）。可以push，不需要发起合并请求。用作发布测试环境版本的代码库。



##### 开发流程简介：

每个人fork项目，并设置上游仓库，以及远程仓库对应的dev,master分支(最好和项目分支对应上，这样后面方便 pull 以及 push)

1.领任务，例如新接到一个刊登的任务ES-666序号。那么在本地分支ES-666，并切换到ES-666分支开发任务。
2.任务开发完，合并ES-666分支到你的本地dev并提交到 远程仓库dev 和上游仓库dev ，并发给测试。
3.测试通过后，如果这个任务要上线，那就吧这个ES-666 合并到master，然后推送到 远程仓库master 和  上游仓库master，最后切换到本地master分支打包发给测试，可以发版正式。
4.线上没问题后，可以自行删除 本地ES-666分支。






没有全局设置过的，需要Git全局设置
```javascript
git config --global user.name "彭佳"
git config --global user.email "pengjia@techb.top"
```



##### 开发流程详解

示例项目地址：http:#192.168.3.126/web/gittest （下面简称 上游仓库）

1. fork示例项目到自己的库 比如地址为：git@192.168.3.126:pengjia/gittest.git (换成自己的git库地址，下面简称 远程仓库)

2. 把fork的项目克隆下来  ```git clone 你fork的git库地址```
	```bash
	$ git clone git@192.168.3.126:pengjia/gittest.git
  Cloning into 'gittest'...
  remote: Counting objects: 3, done.
  remote: Compressing objects: 100% (2/2), done.
  remote: Total 3 (delta 0), reused 3 (delta 0)
  Receiving objects: 100% (3/3), done.
	```
	
3. 当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。要查看远程库的信息，用 ```git remote```

    ```bash
    $ git remote
    origin

    $ git remote -v
    origin  git@192.168.3.126:pengjia/gittest.git (fetch)
    origin  git@192.168.3.126:pengjia/gittest.git (push)
    ```

4. 此时，你的本地和远程仓库已经关联上，但是还需要设置远程仓库 和 上游仓库的关联上，这样就可以随时同步 上游仓库代码。 添加一个将被同步给 fork 远程的上游仓库  ```git remote add upstream 上游仓库地址```

   ```bash
    Administrator@Pengjia MINGW64 /e/es/gittest (master)
    $ git remote add upstream http:#192.168.3.126/web/gittest
    
    Administrator@Pengjia MINGW64 /e/es/gittest (master)
    $ git remote -v
    origin  git@192.168.3.126:pengjia/gittest.git (fetch)
    origin  git@192.168.3.126:pengjia/gittest.git (push)
    upstream        http:#192.168.3.126/web/gittest (fetch)
    upstream        http:#192.168.3.126/web/gittest (push)
   ```

5. 从上游仓库同步代码到本地,并查看本地分支 用```git branch ```,如果要查看详细的上游以及远程分支信息，用```git branch -a```

   ```bash
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git fetch upstream
   warning: redirecting to http:#192.168.3.126/web/gittest.git/
   From http:#192.168.3.126/web/gittest
    * [new branch]      dev        -> upstream/dev
    * [new branch]      master     -> upstream/master
   
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git branch
     dev
   * master
   
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git branch -a
     dev
   * master
     remotes/origin/HEAD -> origin/master
     remotes/origin/dev
     remotes/origin/master
     remotes/upstream/dev
     remotes/upstream/master
   
   ```

6. 比如现在接到一个任务ES-666的功能开发，现在本地新建ES-666分支。
    新建分支```git branch ES-666```，然后切换到ES-666分支```git checkout ES-666```进行任务开发。 
    或者直接新建分支并切换到新分支 ```git checkout -b ES-666```进行开发任务

    ```bash
    Administrator@Pengjia MINGW64 /e/es/gittest (master)
    $ git branch ES-666
    
    Administrator@Pengjia MINGW64 /e/es/gittest (master)
    $ git checkout ES-666
    Switched to branch 'ES-666'
    
    Administrator@Pengjia MINGW64 /e/es/gittest (master)
    $ git checkout -b ES-666
    Switched to a new branch 'ES-666'
    
    Administrator@Pengjia MINGW64 /e/es/gittest (ES-666)
    $ git branch
    * ES-666
      dev
      master
    
    ```

    

7.  现在 ES-666任务开发完，准备进行测试。需要推送到 远程仓库dev 以及 上游仓库的dev上去。分为下面几个步骤

    1. 先在ES-666分支上```git add 以及 git commit ``` 代码（如果此时有紧急任务处理，需要处理其他任务，这个时候可以用 暂存 ```git stash```后面再说）

       ```bash
       Administrator@Pengjia MINGW64 /e/es/gittest (ES-666)
       $ git add .
       
       Administrator@Pengjia MINGW64 /e/es/gittest (ES-666)
       $ git commit -m "修改README.MD"
       [ES-666 7b8386a] 修改README.MD
        1 file changed, 89 insertions(+)
       ```

       

    2. 此时，代码已经commit 上，就可以切换到dev分支去合并ES-666你刚开发完的功能，合并代码之前，先需要拉取最新的代码（dev分支上有其他的开发人员也提交了代码正在测试中）。切换分支用```git checkout``` 合并代码用 ```git merge``` 拉取代码用 ```git pull ``` 

       ```bash
       
       # 切换到dev 准备合并 ES-666
       Administrator@Pengjia MINGW64 /e/es/gittest (ES-666)
       $ git checkout dev
       Switched to branch 'dev'
       Your branch is up to date with 'upstream/dev'.
       
       # 已经成功切换到dev 先拉取上游仓库其他开发人员的代码，如下图可以看到拉取到其他人提交的 other.md文件（这里如果和你本地文件有冲突，需要解决冲突，再合并提交）
       Administrator@Pengjia MINGW64 /e/es/gittest (dev)
       $ git pull upstream dev
       warning: redirecting to http:#192.168.3.126/web/gittest.git/
       remote: Counting objects: 3, done.
       remote: Compressing objects: 100% (3/3), done.
       remote: Total 3 (delta 0), reused 0 (delta 0)
       Unpacking objects: 100% (3/3), done.
       From http:#192.168.3.126/web/gittest
        * branch            dev        -> FETCH_HEAD
          b25d9af..1cbed8f  dev        -> upstream/dev
       Updating b25d9af..1cbed8f
       Fast-forward
        other.md | 1 +
        1 file changed, 1 insertion(+)
        create mode 100644 other.md
        
        # 此时dev上的代码是最新的，就开始合并你的ES-666分支
       Administrator@Pengjia MINGW64 /e/es/gittest (dev)
       $ git merge ES-666
       Merge made by the 'recursive' strategy.
        README.md | 89 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        1 file changed, 89 insertions(+)
       
       
       ```

    3.  此时在dev上合并完上游代码和本地代码后，可以开始推送到 远程仓库（origin) 或者 上游仓库(upstream),推送代码用 ```git push```，最后就可以打测试包，发给测试进行功能测试了。

       ```bash
       # 此时合并成功后，可以开始推送到 远程仓库（origin） ，这样远程仓库也是最新的代码
       Administrator@Pengjia MINGW64 /e/es/gittest (dev)
       $ git push origin dev
       Enumerating objects: 11, done.
       Counting objects: 100% (11/11), done.
       Delta compression using up to 4 threads
       Compressing objects: 100% (8/8), done.
       Writing objects: 100% (9/9), 2.39 KiB | 1.19 MiB/s, done.
       Total 9 (delta 0), reused 0 (delta 0)
       remote:
       remote: To create a merge request for dev, visit:
       remote:   http:#192.168.3.126/pengjia/gittest/merge_requests/new?merge_request%5Bsource_branch%5D=dev
       remote:
       To 192.168.3.126:pengjia/gittest.git
          c552c41..33049f9  dev -> dev
       
       # 这里再次推送到 上游仓库(upstream) ，如果测试反馈的有bug，再次切换到ES-666分支重复上面的操作。
       Administrator@Pengjia MINGW64 /e/es/gittest (dev)
       $ git push upstream dev
       warning: redirecting to http:#192.168.3.126/web/gittest.git/
       Enumerating objects: 12, done.
       Counting objects: 100% (11/11), done.
       Delta compression using up to 4 threads
       Compressing objects: 100% (7/7), done.
       Writing objects: 100% (8/8), 2.40 KiB | 2.40 MiB/s, done.
       Total 8 (delta 0), reused 0 (delta 0)
       remote:
       remote: To create a merge request for dev, visit:
       remote:   http:#192.168.3.126/web/gittest/merge_requests/new?merge_request%5Bsource_branch%5D=dev
       remote:
       To http:#192.168.3.126/web/gittest
          1cbed8f..33049f9  dev -> dev
       ```
    
8. ES-666的功能测试完成，可以上线。和上面的7-2开始的步骤一样，不过是在本地master上合并ES-666分支，然后提交到 远程仓库的master，最后发起  上游仓库 的合并请求（在gitLab上操作发起合并请求）。 最后在master上打包发给测试上线发版。

   ```bash
   #先切换本地分支到 master上
   Administrator@Pengjia MINGW64 /e/es/gittest (ES-666)
   $ git checkout master
   Switched to branch 'master'
   Your branch is up to date with 'origin/master'.
   
   #然后从上游仓库 拉取master上的最新代码，如下，拉取到一个bug.md文件
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git pull upstream master
   warning: redirecting to http:#192.168.3.126/web/gittest.git/
   remote: Counting objects: 3, done.
   remote: Compressing objects: 100% (2/2), done.
   remote: Total 3 (delta 0), reused 0 (delta 0)
   Unpacking objects: 100% (3/3), done.
   From http:#192.168.3.126/web/gittest
    * branch            master     -> FETCH_HEAD
      b25d9af..8a04027  master     -> upstream/master
   Updating b25d9af..8a04027
   Fast-forward
    bug.md | 1 +
    1 file changed, 1 insertion(+)
    create mode 100644 bug.md
   
   # 合并ES-666到master分支上
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git merge ES-666
   Merge made by the 'recursive' strategy.
    README.md | 180 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    1 file changed, 180 insertions(+)
    
   # 提交到 远程仓库
   Administrator@Pengjia MINGW64 /e/es/gittest (master)
   $ git push origin master
   Enumerating objects: 7, done.
   Counting objects: 100% (7/7), done.
   Delta compression using up to 4 threads
   Compressing objects: 100% (4/4), done.
   Writing objects: 100% (5/5), 597 bytes | 597.00 KiB/s, done.
   Total 5 (delta 0), reused 0 (delta 0)
   To 192.168.3.126:pengjia/gittest.git
      b25d9af..e639ab2  master -> master
   
   
   
   ```
   
   
   
   
