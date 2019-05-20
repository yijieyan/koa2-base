const { Rule, LinValidator } = require('../../core/lin-validator.js');

class PositiveIntegerValidator extends LinValidator{
  constructor() {
    super();
    this.id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
  }
}

class RegisterValidator extends LinValidator{
  constructor() {
    super();
    this.email = [
      new Rule('isEmail','不符合Email规范')
    ]

    this.password1 = [
      new Rule('isLengeh', '密码至少6个字符,最多32个字符',{
        min:6,
        max:32
      }),
      new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]

    this.password2 = this.password1;
    this,nickName = [
      new Rule('isLengeh','昵称不符合长度规范',{
        min:4,
        max:32
      })
    ]
  }

  validatePassword (vals) {
    const pasw1 = vals.body.password1;
    const pasw2 = vals.body.password2
    if (pasw1 !== pasw2) {
      throw new Error('两个密码必须相同')
    } 
  }
}


class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLengeh', '不符合规则',{
        min:4,
        max:32
      })
    ]

    this.secret = [
      new Rule('isOptional'),
      new Rule('isLengeh', '至少6个字符',{
        min:6,
        max:128
      })
    ]
  }

  validateLoginType(vals){
    if (!vals.body.type) {
      throw new Error('type必须是参数');
    }
    if(!this.validateLoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}


class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLengeh','不允许为空',{
        min:1
      })
    ]
  }
}


module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
};