<template>
        <b-row>
            <b-col cols="12" md="3" xl="2" class="bd-sidebar">
                <div class="bd-search d-flex align-items-center">
                    <b-form-input type="text" :placeholder="$t('Filter')"></b-form-input>
                    <b-btn class="bd-search-docs-toggle d-md-none p-0 ml-3" aria-controls="bd-docs-nav">=</b-btn>
                </div>
                <b-collapse is-nav class="bd-links" id="bd-docs-nav">
                    <div class="bd-toc-item active">
                        <b-nav vertical class="bd-sidenav">
                            <div class="bd-toc-link" v-t="'Policies and Access Control'"></div>
                            <b-nav-item to="/configuration/roles" replace>{{ $t('Roles') }}</b-nav-item>
                            <b-nav-item to="/configuration/domains" replace>{{ $t('Domains') }}</b-nav-item>
                            <b-nav-item to="/configuration/realms" replace>{{ $t('REALMS') }}</b-nav-item>
                            <div class="bd-toc-link" v-t="'Network Configuration'"></div>
                            <b-nav-item to="/configuration/floating_devices" replace>{{ $t('Floating Devices') }}</b-nav-item>
                        </b-nav>
                    </div>
                </b-collapse>
            </b-col>
            <b-col cols="12" md="9" xl="10" class="mt-3 mb-3">
                <transition name="slide-bottom">
                    <router-view></router-view>
                </transition>
            </b-col>
        </b-row>
</template>

<script>
export default {
  name: 'Configuration'
}
</script>