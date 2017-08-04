angular.module("myApp", [])
  .controller("myCtrl", ["$scope", function ($scope) {
    $scope.taskList = [];

    //从localStorage中获取数据
    if (localStorage.getItem("taskListStr")) {
      $scope.taskList = angular.fromJson(localStorage.getItem("taskListStr"));
    }
    //同步localStorage
    $scope.$watch("taskList", function () {
      localStorage.setItem("taskListStr", angular.toJson($scope.taskList));
    }, true);


    //添加任务
    $scope.addTask = function () {
      $scope.taskList.push({
        id: Math.random() + Date.now(),
        name: $scope.taskName,
        isCompleted: false,
        isEdit: false
      })
      //输入框清空
      $scope.taskName = "";
    }

    //删除任务
    $scope.delTask = function (id) {
      for (var i = 0; i < $scope.taskList.length; i++) {
        if ($scope.taskList[i].id == id) {
          $scope.taskList.splice(i, 1);
        }
      }
    }

    //标记已完成的任务
    // $scope.toggleStatus = function (id) {
    //   for (var i = 0; i < $scope.taskList.length; i++) {
    //     if ($scope.taskList[i].id == id) {
    //       $scope.taskList[i].isComplete = true;
    //     }
    //   }
    // }

    //清空已完成的任务
    $scope.clearCompleted = function () {

      for (var i = 0; i < $scope.taskList.length; i++) {
        if ($scope.taskList[i].isCompleted) {
          $scope.taskList.splice(i, 1);
          i--;
        }
      }

    }

    //统计未完成任务的数量
    $scope.amountOfLeft = function () {
      var amount = 0;
      for (var i = 0; i < $scope.taskList.length; i++) {
        if (!$scope.taskList[i].isCompleted) {
          amount++;
        }
      }
      //必须要有返回值，渲染页面
      return amount;
    }

    //按条件查询
    //初始化查询条件
    $scope.condition = "";
    $scope.queryByCondition = function (type) {

      switch (type) {
        case "All":
          $scope.condition = "";
          break;
        case "Active":
          $scope.condition = false;
          break;
        case "Completed":
          $scope.condition = true;
          break;
      }
    }

    //批量切换状态
    $scope.toggleStatusAll = function () {
      for (var i = 0; i < $scope.taskList.length; i++) {
        $scope.taskList[i].isCompleted = $scope.CompletedAll;
      }
    }

    //同步所有的任务状态和批量控制按钮的显示状态
    $scope.toggleStatusBysele = function () {
      for (var i = 0; i < $scope.taskList.length; i++) {
        if (!$scope.taskList[i].isCompleted) {
          $scope.CompletedAll = false;
          return;
        }
      }
      //执行到这里，说明isCompleted全部都是true
      $scope.CompletedAll = true;
    }

    //修改任务
    $scope.modifyTask = function (id) {
      for (var i = 0; i < $scope.taskList.length; i++) {
        if ($scope.taskList[i].id == id) {
          $scope.taskList[i].isEdit = true;
        } else {
          $scope.taskList[i].isEdit = false;
        }
      }
    }

    //失去焦点，保存修改之后的任务，恢复样式
    $scope.saveTask = function () {
      for (var i = 0; i < $scope.taskList.length; i++) {
        $scope.taskList[i].isEdit = false;
      }
    }

  }])


