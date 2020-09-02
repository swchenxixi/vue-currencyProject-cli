<script>
import Logo from '@/components/logo';

export default {
  name: 'SideMenu',
  components: {
    Logo
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    selectedKeys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      rootSubmenuKeys: [],
      openKeys: [],
      cachedOpenKeys: []
    };
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    onSelect(obj) {
      this.$emit('select', obj);
    },
    renderItem(menu) {
      return menu.children
        ? this.renderSubMenu(menu)
        : this.renderMenuItem(menu);
    },
    renderMenuItem(menu) {
      return (
        <a-menu-item key={menu.path}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </a-menu-item>
      );
    },
    renderSubMenu(menu) {
      const menuItems = menu.children.map(item => {
        return this.renderItem(item);
      });
      return (
        <a-sub-menu key={menu.path}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {menuItems}
        </a-sub-menu>
      );
    },
    renderIcon(icon) {
      if (icon === 'none' || icon === undefined) {
        return null;
      }
      return <a-icon type={icon} />;
    }
  },
  render() {
    const {
      mode,
      menus,
      openKeys,
      onOpenChange,
      selectedKeys,
      onSelect,
      renderItem
    } = this;
    const menuTree = menus.map(item => {
      return renderItem(item);
    });
    const props = {
      selectedKeys,
      openKeys,
      mode
    };
    const on = {
      openChange: onOpenChange,
      select: onSelect
    };
    return (
      <div>
        <logo />
        <a-menu {...{ props, on }}>{menuTree}</a-menu>
      </div>
    );
  }
};
</script>
